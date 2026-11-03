import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

// Fake credentials: these tests must never be able to reach real Firestore, Cloudinary or Resend.
// dotenv does not override values that are already set, so backend/.env is ignored for these.
const { privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
});
Object.assign(process.env, {
  NODE_ENV: 'production',
  FIREBASE_PROJECT_ID: 'test-project',
  FIREBASE_CLIENT_EMAIL: 'test@test-project.iam.gserviceaccount.com',
  FIREBASE_PRIVATE_KEY: privateKey,
  CLOUDINARY_CLOUD_NAME: 'test',
  CLOUDINARY_API_KEY: 'test',
  CLOUDINARY_API_SECRET: 'test',
  RESEND_API_KEY: '',
  TRUST_PROXY_HOPS: '0',
});

const { default: app } = await import('../src/app.js');
const { default: cloudinary } = await import('../src/config/cloudinary.js');
const { AppAstralModel } = await import('../src/models/AppAstralModel.js');
const { AwardsModel } = await import('../src/models/AwardsModel.js');
const { InnothonModel } = await import('../src/models/InnothonModel.js');
const { ProtoPlanetModel } = await import('../src/models/ProtoPlanetModel.js');
const { renderConfirmationEmail } = await import('../src/views/emails/confirmationEmail.js');
const { normalizePrivateKey } = await import('../src/utils/privateKey.js');

const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(32)]);
const PDF = Buffer.from('%PDF-1.4\nfake body\n%%EOF\n');
const HTML = Buffer.from('<html><script>alert(1)</script></html>');

let server;
let base;
let saved;
let uploads;

before(async () => {
  cloudinary.uploader.upload_stream = (options, callback) => ({
    end: (buffer) => {
      uploads.push({ options, buffer });
      callback(null, { secure_url: `https://cdn.test/${options.folder}/${uploads.length}` });
    },
  });
  for (const Model of [AppAstralModel, AwardsModel, InnothonModel, ProtoPlanetModel]) {
    Model.create = async (entity) => {
      saved.push(entity);
      return entity;
    };
  }
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

beforeEach(() => {
  saved = [];
  uploads = [];
});

const postJson = (path, body) =>
  fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const postForm = (path, fields, files = {}) => {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    form.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
  }
  for (const [key, { buffer, type, name }] of Object.entries(files)) {
    form.append(key, new Blob([buffer], { type }), name);
  }
  return fetch(`${base}${path}`, { method: 'POST', body: form });
};

const answerTo = (entity, question, section) =>
  entity.answers.find((entry) => entry.question === question && (!section || entry.section === section))?.answer;

const AWARD_ANSWERS = {
  1508358313: 'Asha',
  6064807: 'asha@example.com',
  62587424: 'Telangana',
  952420036: '9000000000',
  384312110: 'VIT-AP',
  1622581677: 'No',
  1063768476: 'Student',
  'student-award-category': 'Outstanding Academic Performance',
  isStudent: 'true',
  isProfessional: 'false',
  awardCategoryTitle: 'Outstanding Academic Performance',
};

const INNOTHON = {
  teamName: 'Team',
  institutionName: 'VIT-AP',
  cityState: 'Amaravati, AP',
  problemStatement: 'P1',
  leaderName: 'Asha',
  leaderEmail: 'asha@example.com',
  leaderPhone: '9000000000',
  motivationStatement: 'Because',
  feeType: 'student',
  transactionId: 'TXN1',
  member2: { name: 'Ravi', email: 'ravi@example.com' },
  transactionScreenshot: `data:image/png;base64,${PNG.toString('base64')}`,
};

const TEAM = {
  teamName: 'Team',
  institutionName: 'VIT-AP',
  cityState: 'Amaravati, AP',
  member1: { name: 'Asha', email: 'asha@example.com' },
  member2: { name: 'Ravi', email: 'ravi@example.com' },
};

const PROTOPLANET = {
  ...TEAM,
  projectTitle: 'Robot',
  projectAbstract: { track: 'Hardware', problemStatement: 'P' },
  feeType: 'student',
  transactionId: 'TXN1',
};

const png = { buffer: PNG, type: 'image/png', name: 'pay.png' };
const pdf = { buffer: PDF, type: 'application/pdf', name: 'proof.pdf' };

test('health routes answer without revealing internals', async () => {
  const root = await (await fetch(`${base}/`)).json();
  assert.deepEqual(root, { service: 'IET 360° API', status: 'online' });
  assert.equal((await fetch(`${base}/health`)).status, 200);
});

test('routes that exposed registrant data are gone', async () => {
  for (const path of ['/api/patn/registrations', '/api/innothon/status/INN-1', '/api/protoplan/status/PP-1']) {
    assert.equal((await fetch(`${base}${path}`)).status, 404, path);
  }
  assert.equal((await postJson('/api/startupsphere/register', {})).status, 404);
});

test('security headers are set', async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.headers.get('x-powered-by'), null);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
});

test('CORS allows the website origins only', async () => {
  const origin = async (value) =>
    (await fetch(`${base}/health`, { headers: { Origin: value } })).headers.get('access-control-allow-origin');
  assert.equal(await origin('https://iet360.org'), 'https://iet360.org');
  assert.equal(await origin('https://iet-future-frontier-web.vercel.app'), 'https://iet-future-frontier-web.vercel.app');
  assert.equal(await origin('https://evil.example'), null);
  assert.equal(await origin('http://localhost:8080'), null);
});

test('awards: a complete application with a PDF is saved', async () => {
  const res = await postForm('/api/awards/register', AWARD_ANSWERS, { 1137808243: pdf });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.match(body.data.registrationId, /^AWD-/);
  assert.equal(saved.length, 1);
  assert.equal(saved[0].email, 'asha@example.com');
  assert.equal(saved[0].isStudent, true);
  assert.equal(saved[0].awardCategoryTitle, 'Outstanding Academic Performance');
  assert.equal(saved[0].responses, undefined);
  assert.equal(answerTo(saved[0], 'State', 'General Information'), 'Telangana');
  assert.equal(answerTo(saved[0], 'Student Awards Category'), 'Outstanding Academic Performance');
  assert.match(answerTo(saved[0], 'Kindly Provide Documentary Proof'), /innoverse\/awards\/documents/);
});

test('awards: answers keep the form order and only include questions the applicant was asked', async () => {
  const res = await postForm(
    '/api/awards/register',
    { ...AWARD_ANSWERS, 963333536: 'Yes', 555: 'stray answer', 269701494: 'from another award' },
    { 1137808243: pdf, 269701494: pdf }
  );
  assert.equal(res.status, 200);
  const { answers } = saved[0];
  assert.equal(answers[0].question, 'Name');
  assert.deepEqual([...new Set(answers.map((entry) => entry.section))], [
    'General Information',
    'Award Category',
    'Outstanding Academic Performance',
  ]);
  assert.equal(answerTo(saved[0], 'Have you published any research papers, patents, or technical reports?'), 'Yes');
  assert.equal(JSON.stringify(answers).includes('stray answer'), false);
  assert.equal(JSON.stringify(answers).includes('from another award'), false);
  assert.equal(uploads.length, 1, 'file for another award is not uploaded');
  assert.equal(answers.filter((entry) => entry.question === 'Kindly Provide Documentary Proof').length, 2);
});

test('awards: typed text cannot pose as an uploaded file', async () => {
  const res = await postForm('/api/awards/register', { ...AWARD_ANSWERS, 1137808243: 'https://evil.example/x.pdf' });
  assert.equal(res.status, 200);
  assert.equal(answerTo(saved[0], 'Kindly Provide Documentary Proof'), '');
});

test('awards: the award must exist in the chosen category', async () => {
  for (const awardCategoryTitle of ['Made Up Award', 'Woman Engineer of the Year']) {
    const res = await postForm('/api/awards/register', { ...AWARD_ANSWERS, awardCategoryTitle });
    assert.equal(res.status, 400, awardCategoryTitle);
  }
  assert.equal(saved.length, 0);
});

test('awards: the category comes from the answer, not a separate flag', async () => {
  await postForm('/api/awards/register', { ...AWARD_ANSWERS, isStudent: 'false', isProfessional: 'true' });
  assert.equal(saved[0].isStudent, true);
  assert.equal(saved[0].isProfessional, false);
});

test('award questions match the website form', async () => {
  const website = await import('../../src/data/awardsData.ts');
  const { GENERAL_QUESTIONS, STUDENT_AWARDS, PROFESSIONAL_AWARDS } = await import('../src/data/awardForm.js');
  const question = ({ id, title, type }) => ({ id: String(id), title: title.trim(), type });
  const award = ({ title, questions }) => ({ title: title.trim(), questions: questions.map(question) });
  assert.deepEqual(GENERAL_QUESTIONS, website.generalInformation.map(question));
  assert.deepEqual(STUDENT_AWARDS, website.studentAwards.map(award));
  assert.deepEqual(PROFESSIONAL_AWARDS, website.professionalAwards.map(award));
});

test('awards: general information is compulsory on the server too', async () => {
  const { 62587424: state, ...withoutState } = AWARD_ANSWERS;
  const res = await postForm('/api/awards/register', withoutState);
  assert.equal(res.status, 400);
  assert.match((await res.json()).message, /State is required/);
  assert.equal(saved.length, 0);
});

test('awards: membership number is required only for IET members', async () => {
  const member = { ...AWARD_ANSWERS, 1622581677: 'Yes' };
  assert.equal((await postForm('/api/awards/register', member)).status, 400);
  assert.equal((await postForm('/api/awards/register', { ...member, 1608733035: 'M123' })).status, 200);
  assert.equal(answerTo(saved[0], 'If Yes, Provide Your IET Membership Number If No, NA'), 'M123');
  await postForm('/api/awards/register', AWARD_ANSWERS);
  assert.equal(answerTo(saved[1], 'If Yes, Provide Your IET Membership Number If No, NA'), undefined);
});

test('awards: invalid email is rejected', async () => {
  assert.equal((await postForm('/api/awards/register', { ...AWARD_ANSWERS, 6064807: 'nope' })).status, 400);
});

test('uploads: disallowed type, disguised content, bad field and oversize are rejected', async () => {
  const cases = {
    'disallowed type': { 111: { buffer: HTML, type: 'text/html', name: 'x.html' } },
    'HTML disguised as PDF': { 111: { buffer: HTML, type: 'application/pdf', name: 'x.pdf' } },
    'HTML containing a PDF marker': {
      111: { buffer: Buffer.from('<html><script>alert(1)</script>%PDF-1.4</html>'), type: 'application/pdf', name: 'x.pdf' },
    },
    'non-question field name': { evil: pdf },
    'Word document': { 111: { buffer: Buffer.from([0x50, 0x4b, 0x03, 0x04, 0, 0]), type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', name: 'x.docx' } },
    'old Word document': { 111: { buffer: Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0, 0]), type: 'application/msword', name: 'x.doc' } },
    'WEBP image': { 111: { buffer: Buffer.from('RIFF0000WEBPVP8 '), type: 'image/webp', name: 'x.webp' } },
    'HEIC image': { 111: { buffer: Buffer.from('0000ftypheic0000'), type: 'image/heic', name: 'x.heic' } },
    oversize: {
      111: { buffer: Buffer.concat([PDF, Buffer.alloc(10 * 1024 * 1024)]), type: 'application/pdf', name: 'big.pdf' },
    },
  };
  for (const [label, files] of Object.entries(cases)) {
    const res = await postForm('/api/awards/register', AWARD_ANSWERS, files);
    assert.equal(res.status, 400, label);
  }
  assert.equal(uploads.length, 0);
  assert.equal(saved.length, 0);
});

test('awards: PDF, PNG and JPEG files are all accepted', async () => {
  const jpeg = { buffer: Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]), type: 'image/jpeg', name: 'x.jpg' };
  const res = await postForm('/api/awards/register', AWARD_ANSWERS, { 1137808243: pdf, 2119154875: png, 33858741: jpeg });
  assert.equal(res.status, 200);
  assert.equal(uploads.length, 3);
});

test('appastral: registration with payment and accommodation files is saved', async () => {
  const res = await postForm('/api/appastral/register', { ...TEAM, termsAccepted: 'true' }, {
    member1Payment: png,
    member2AccommodationPayment: png,
  });
  assert.equal(res.status, 200);
  const { leader, member2, member3 } = saved[0].teamMembers;
  assert.match(leader.paymentUrl, /appastral\/payments/);
  assert.match(member2.accommodationPaymentUrl, /appastral\/accommodation/);
  assert.equal(member3, null);
  assert.equal(saved[0].termsAccepted, true);
  assert.equal(answerTo(saved[0], 'Team Name'), 'Team');
  assert.equal(answerTo(saved[0], 'Full Name', 'Member 2'), 'Ravi');
  assert.equal(answerTo(saved[0], 'I/We agree to the above terms and declarations'), 'Yes');
  assert.match(answerTo(saved[0], 'Upload Transaction Screenshot', 'Team Leader'), /appastral\/payments/);
  assert.equal(saved[0].answers.some((entry) => entry.section === 'Member 3'), false);
});

test('appastral: missing second member and malformed JSON are rejected', async () => {
  const { member2, ...oneMember } = TEAM;
  assert.equal((await postForm('/api/appastral/register', oneMember)).status, 400);
  assert.equal((await postForm('/api/appastral/register', { ...TEAM, member1: '{broken' })).status, 400);
});

test('appastral: unknown file fields and PDFs are rejected', async () => {
  assert.equal((await postForm('/api/appastral/register', TEAM, { other: png })).status, 400);
  assert.equal((await postForm('/api/appastral/register', TEAM, { member1Payment: pdf })).status, 400);
});

test('protoplanet: registration is saved and the title cannot be overridden', async () => {
  const res = await postForm(
    '/api/protoplan/register',
    { ...PROTOPLANET, projectAbstract: { track: 'Hardware', projectTitle: 'Overridden' } },
    { screenshot: png }
  );
  assert.equal(res.status, 200);
  assert.equal(saved[0].projectDetails.projectTitle, 'Robot');
  assert.equal(saved[0].projectDetails.track, 'Hardware');
  assert.equal(answerTo(saved[0], 'Select Your Track'), 'Hardware');
  assert.equal(answerTo(saved[0], 'Project Title'), 'Robot');
  assert.match(saved[0].paymentDetails.screenshotUrl, /protoplanet\/payments/);
});

test('protoplanet: screenshot is required', async () => {
  assert.equal((await postForm('/api/protoplan/register', PROTOPLANET)).status, 400);
});

test('innothon: registration with a base64 screenshot is saved', async () => {
  const res = await postJson('/api/innothon/register', INNOTHON);
  assert.equal(res.status, 200);
  assert.match((await res.json()).data.registrationId, /^INN-/);
  assert.equal(uploads[0].buffer.equals(PNG), true);
  assert.equal(saved[0].teamMembers.member2.name, 'Ravi');
  assert.equal(answerTo(saved[0], 'Phone Number (WhatsApp)'), '9000000000');
  assert.equal(answerTo(saved[0], 'Short Motivation Statement'), 'Because');
  assert.equal(answerTo(saved[0], 'I consent to photos/videos for publicity'), 'No');
  assert.match(answerTo(saved[0], 'Upload Transaction Screenshot'), /innothon\/payments/);
  assert.equal(JSON.stringify(saved[0]).includes('base64'), false);
});

test('innothon: bad screenshots are rejected', async () => {
  const bad = [
    undefined,
    `data:image/webp;base64,${Buffer.from('RIFF0000WEBPVP8 ').toString('base64')}`,
    `data:image/svg+xml;base64,${HTML.toString('base64')}`,
    `data:image/png;base64,${HTML.toString('base64')}`,
    `data:image/png;base64,${Buffer.concat([PNG, Buffer.alloc(10 * 1024 * 1024)]).toString('base64')}`,
  ];
  for (const transactionScreenshot of bad) {
    assert.equal((await postJson('/api/innothon/register', { ...INNOTHON, transactionScreenshot })).status, 400);
  }
  assert.equal(uploads.length, 0);
});

test('unsafe keys are stripped and oversized answers rejected', async () => {
  const payload = JSON.stringify({ ...INNOTHON, member2: { name: 'Ravi', 'a.b': 'x' } }).replace(
    '"member2":{',
    '"member2":{"__proto__":{"polluted":true},"__name__":"x",'
  );
  assert.equal((await postJson('/api/innothon/register', payload)).status, 200);
  assert.deepEqual(saved[0].teamMembers.member2, { name: 'Ravi' });
  assert.equal({}.polluted, undefined);

  const long = await postJson('/api/innothon/register', { ...INNOTHON, member2: { name: 'x'.repeat(20001) } });
  assert.equal(long.status, 400);
});

test('malformed JSON gets a clean 400', async () => {
  const res = await postJson('/api/patn/register', '{not json');
  assert.equal(res.status, 400);
  assert.deepEqual(await res.json(), { success: false, message: 'The submitted data is not valid.' });
});

test('patn: registration is closed', async () => {
  const res = await postJson('/api/patn/register', { fullName: 'Asha', emailAddress: 'asha@example.com' });
  assert.equal(res.status, 403);
  assert.match((await res.json()).message, /registration is closed/);
  assert.equal(saved.length, 0);
});

test('unexpected errors do not leak details', async () => {
  const original = InnothonModel.create;
  const consoleError = console.error;
  console.error = () => {};
  InnothonModel.create = async () => {
    throw new Error('secret firestore path');
  };
  try {
    const res = await postJson('/api/innothon/register', INNOTHON);
    assert.equal(res.status, 500);
    assert.equal(JSON.stringify(await res.json()).includes('secret'), false);
  } finally {
    InnothonModel.create = original;
    console.error = consoleError;
  }
});

test('confirmation email escapes user input', () => {
  const html = renderConfirmationEmail({
    leaderName: '<img src=x onerror=alert(1)>',
    eventName: 'Event',
    registrationId: 'ID-1',
    details: [{ label: 'Team Name', value: '<script>x</script>' }],
  });
  assert.equal(html.includes('<img src=x'), false);
  assert.equal(html.includes('<script>x'), false);
  assert.equal(html.includes('&lt;img src=x'), true);
  assert.equal(html.includes('ID-1'), true);
});

test('private key is accepted however the dashboard stored it', () => {
  const escaped = privateKey.trim().replace(/\n/g, '\\n');
  const variants = {
    'real line breaks': privateKey,
    'literal \\n': escaped,
    'double quotes': `"${escaped}"`,
    'single quotes': `'${escaped}'`,
    'JSON line with trailing comma': `"${escaped}",`,
    'double-escaped \\n': privateKey.trim().replace(/\n/g, '\\\\n'),
    'Windows line breaks': privateKey.replace(/\n/g, '\r\n'),
    'literal \\r\\n': privateKey.trim().replace(/\n/g, '\\r\\n'),
    'spaces instead of line breaks': privateKey.trim().replace(/\n/g, ' '),
    'surrounding whitespace': `  ${privateKey}  `,
  };
  for (const [label, value] of Object.entries(variants)) {
    assert.doesNotThrow(() => crypto.createPrivateKey(normalizePrivateKey(value)), label);
  }
});

test('an incomplete private key gives a clear error that hides the key', () => {
  const truncated = privateKey.slice(0, 200);
  assert.throws(() => normalizePrivateKey(truncated), (error) => {
    assert.match(error.message, /incomplete/);
    assert.match(error.message, /END line present: false/);
    assert.equal(error.message.includes(truncated.slice(40, 80)), false);
    return true;
  });
  assert.throws(() => normalizePrivateKey(''), /incomplete/);
});

// Keep last: this uses up the registration allowance for the test client.
test('registration attempts are rate limited', async () => {
  let last;
  for (let i = 0; i < 70; i += 1) {
    last = await postJson('/api/patn/register', {});
    if (last.status === 429) break;
  }
  assert.equal(last.status, 429);
  assert.match((await last.json()).message, /Too many registration attempts/);
});

const PEM_KEY = /-----BEGIN PRIVATE KEY-----([\s\S]*?)-----END PRIVATE KEY-----/;

/**
 * Rebuilds a service account key into valid PEM. Hosting dashboards can add quotes
 * or turn line breaks into "\n" text or spaces, depending on how the value was pasted.
 * Errors describe the value's shape only, so the key can never reach the logs.
 */
export const normalizePrivateKey = (raw) => {
  const value = String(raw ?? '');
  const match = value.replace(/\\+r/g, '').replace(/\\+n/g, '\n').match(PEM_KEY);

  if (!match) {
    throw new Error(
      'FIREBASE_PRIVATE_KEY is incomplete: expected the full key from the service account file ' +
        `(BEGIN line present: ${value.includes('BEGIN PRIVATE KEY')}, ` +
        `END line present: ${value.includes('END PRIVATE KEY')}, length: ${value.length}).`
    );
  }

  const lines = match[1].replace(/\s/g, '').match(/.{1,64}/g) || [];
  return ['-----BEGIN PRIVATE KEY-----', ...lines, '-----END PRIVATE KEY-----', ''].join('\n');
};

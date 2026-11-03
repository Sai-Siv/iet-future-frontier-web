import { body } from 'express-validator';
import { requiredText, requiredEmail, optionalEmail } from './common.js';
import { QUESTION_IDS as Q, findAward } from '../models/AwardsModel.js';

export const appAstralRules = [
  requiredText('teamName', 'Team name'),
  requiredText('institutionName', 'Institution name'),
  requiredText('cityState', 'City and state'),
  requiredText('member1.name', 'Team leader name'),
  requiredText('member2.name', 'Member 2 name'),
  optionalEmail('member1.email', 'Team leader email'),
  optionalEmail('member2.email', 'Member 2 email'),
  optionalEmail('member3.email', 'Member 3 email'),
];

export const protoPlanetRules = [
  requiredText('teamName', 'Team name'),
  requiredText('institutionName', 'Institution name'),
  requiredText('cityState', 'City and state'),
  requiredText('projectTitle', 'Project title'),
  body('projectAbstract')
    .exists({ values: 'falsy' }).withMessage('Project details are required')
    .bail()
    .isObject().withMessage('Project details are not valid'),
  requiredText('feeType', 'Fee type'),
  requiredText('transactionId', 'Transaction ID'),
  optionalEmail('member1.email', 'Team leader email'),
  optionalEmail('member2.email', 'Member 2 email'),
  optionalEmail('member3.email', 'Member 3 email'),
];

export const innothonRules = [
  requiredText('teamName', 'Team name'),
  requiredText('institutionName', 'Institution name'),
  requiredText('cityState', 'City and state'),
  requiredText('problemStatement', 'Problem statement'),
  requiredText('leaderName', 'Team leader name'),
  requiredEmail('leaderEmail', 'Team leader email'),
  requiredText('leaderPhone', 'Team leader phone'),
  optionalEmail('leaderAltEmail', 'Team leader alternate email'),
  requiredText('motivationStatement', 'Motivation statement'),
  requiredText('feeType', 'Fee type'),
  requiredText('transactionId', 'Transaction ID'),
];

export const awardsRules = [
  requiredText(Q.name, 'Name'),
  requiredEmail(Q.email, 'Email address'),
  requiredText(Q.state, 'State'),
  requiredText(Q.phone, 'Mobile number'),
  requiredText(Q.institution, 'University/College/Organization name'),
  body(Q.isIETMember).isIn(['Yes', 'No']).withMessage('IET membership status is required'),
  body(Q.ietMembershipNumber)
    .if(body(Q.isIETMember).equals('Yes'))
    .exists({ values: 'falsy' }).withMessage('IET membership number is required'),
  body(Q.category).isIn(['Student', 'Professional']).withMessage('Category is required'),
  body('awardCategoryTitle')
    .custom((title, { req }) => Boolean(findAward(req.body[Q.category], title)))
    .withMessage('Please choose an award from the list'),
];

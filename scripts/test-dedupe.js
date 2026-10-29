'use strict';
const assert = require('assert');
const { dedupeJobs } = require('./update-jobs.js');

const a = { cid: 'acme', company: 'Acme', title: 'Software Intern', city: 'Bengaluru', url: 'https://boards.greenhouse.io/acme/jobs/1' };
const sameTitle = { cid: 'acme', company: 'Acme', title: 'Software  Intern', city: 'Bengaluru', url: 'https://example.com/other' };
const otherCity = { cid: 'acme', company: 'Acme', title: 'Software Intern', city: 'Hyderabad', url: 'https://boards.greenhouse.io/acme/jobs/2' };
const sameUrl = { cid: 'acme', company: 'Acme', title: 'Graduate Engineer', city: 'Pune', url: 'https://boards.greenhouse.io/acme/jobs/1?utm_source=x' };
const noUrl = { cid: null, company: 'Other Co', title: 'Intern', city: 'Bengaluru', url: '' };
const otherCompany = { cid: null, company: 'Different', title: 'Intern', city: 'Bengaluru', url: '' };

const out = dedupeJobs([a, sameTitle, otherCity, sameUrl, noUrl, otherCompany]);
assert.deepStrictEqual(out.map(j => j.url), [a.url, otherCity.url, '', '']);
assert.strictEqual(out.length, 4);
assert.strictEqual(dedupeJobs([]).length, 0);
console.log('dedupeJobs: ok');

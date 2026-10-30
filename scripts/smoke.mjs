/** Lightweight HTTP smoke checks. Run against a running Next.js deployment. */
import assert from 'node:assert/strict';

const origin = (process.env.SMOKE_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const check = async (path, pattern, label) => {
 const response = await fetch(origin + path, { redirect: 'follow' });
 assert.equal(response.status, 200, `${label}: HTTP ${response.status}`);
 const html = await response.text();
 if (pattern) assert.match(html, pattern, `${label}: expected content missing`);
 console.log('PASS', label);
};
try {
 await check('/en', /<html[^>]*lang="en"/, 'English homepage and lang');
 await check('/ar', /<html[^>]*lang="ar"[^>]*dir="rtl"/, 'Arabic homepage and RTL');
 await check('/images/hero-one.webp', null, 'Hero image one');
 await check('/images/hero-two.webp', null, 'Hero image two');
 await check('/images/hero-three.webp', null, 'Hero image three');
 await check('/brand/inbs-logo.png', null, 'Official brand logo');
 await check('/robots.txt', /User-agent:/i, 'Robots policy');
 console.log('Smoke checks passed:', origin);
} catch(error) { console.error('Smoke checks failed:', error); process.exitCode = 1; }

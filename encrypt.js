const crypto = require('crypto');

const PASSWORD = process.argv[2];
if (!PASSWORD) {
  console.error('Usage: node encrypt.js <password>');
  process.exit(1);
}

const slides = [
  {
    type: 'intro',
    title: 'Liability Loop-de-Loop',
    body: `Hello, MSCHF! You are about to embark on one of the greatest rollercoaster rides of all time. Prepare to board the\u2026 <strong>Liability Loop-de-Loop!</strong><br><br>This presentation provides a guided tour through five essential legal considerations for your product, the Phone Roller Coaster. At every twist and turn, you\u2019ll discover 1) a potential issue, 2) the legal authority substantiating the issue, and 3) a proposed solution designed to keep everything on \u201ctrack.\u201d<br><br>Click to expand the analysis and click again to head to the next station. Remember to please keep your arms, legs, and liability exposure inside the vehicle at all times\u2026<br><br><em>Enjoy the ride!</em>`,
    tag: 'Welcome Aboard',
    color: '#6C63FF',
  },
  {
    type: 'issue',
    title: 'Issue 1: Device Safety',
    problem: `If not properly secured, a participant\u2019s phone can fly off the coaster and become a dangerous projectile for the thousands of pier-goers below.`,
    law: `Under California tort law, both the park owner (SMP) and the device manufacturer (MSCHF) could face negligence claims from a bystander injured by the phone projectile. See <em>Rowland v. Christian</em>, 69 Cal. 2d 108, 119 (1968) (establishing a multi-factor liability test that applies expansively to the \u201cpossessor of land\u201d); see <em>Greenman v. Yuba Power Products</em>, 59 Cal. 2d 57 (1963) (holding manufacturers strictly liable for a defective product that causes injury).`,
    solution: `Although the term sheet broadly discusses project management, consider including a certification clause that mandates third-party stress testing. Additionally, the term sheet does not reference an indemnification clause. If there isn\u2019t one, there should be! Assuming a written indemnification agreement exists elsewhere, consider splitting the clause in two: MSCHF indemnifies for manufacture and design errors, while the SMP indemnifies for onsite installation defects; consider also a cross-indemnity carve-out for concurrent faults. Finally, the partnership should produce some kind of safety protocol addendum which addresses proper staff training, participant instructions, and a safety checklist for ride operators.`,
    tag: 'Station 1',
    color: '#FF6B6B',
  },
  {
    type: 'issue',
    title: 'Issue 2: Electrical Safety',
    problem: `Although participants typically carry their phones with them on rollercoaster rides, a device that holds several powered-on phones at once is more likely to short circuit or produce an arc flash.`,
    law: `The Division of Occupational Safety and Health (\u201cDOSH\u201d) regulates the electrical safety obligations for California amusement parks. Consistent with the cited device safety law, MSCHF and the SMP could face negligence claims arising from injuries caused by electrical failures in addition to a DOSH citation (and thus a potential device/ride shutdown).`,
    solution: `If MSCHF is responsible for electrical compliance, consider including an electrical compliance clause that clearly states the device complies with battery safety, and water protection strategies. If SMP is responsible (since the electrical source is seemingly derived from the SMP\u2019s rollercoaster, itself), consider co-hiring a third-party electrical engineer to inspect the device and the ride for ongoing compliance.`,
    tag: 'Station 2',
    color: '#4ECDC4',
  },
  {
    type: 'issue',
    title: 'Issue 3: Video Content Rights',
    problem: `The term sheet states that all IP \u201ccreated by MSCHF\u2026shall remain the sole property of MSCHF.\u201d We assume that this relates to IP rights between MSCHF and the SMP, but based on this language, one could imagine a dispute between a pier-goer who uses the Phone Coaster to create a video and MSCHF, who arguably co-\u201ccreated\u201d the IP by facilitating the entire process.`,
    law: `Joint authorship of copyrighted material typically requires intent from all parties. That said, whatever the IP allocation may be between MSCHF and SMP, pier-goers themselves may reasonably expect to exclusively own any created content.`,
    solution: `Although the term sheet\u2019s provision likely prevents the SMP from claiming their own ownership of MSCHF\u2019s IP, consider including a sub-provision or a tiered content rights schedule that includes pier-goers, who ostensibly have (and own) the IP on their phone as soon as they hit \u201crecord.\u201d If MSCHF does not seek to own the content filmed on participants\u2019 phones, that should also be made clear in the term sheet and to the pier-goers themselves.`,
    tag: 'Station 3',
    color: '#DDA0DD',
  },
  {
    type: 'issue',
    title: 'Issue 4: Privacy Concerns from Bystanders',
    problem: `If a participant\u2019s device captures other riders or bystanders, those people may raise privacy claims against MSCHF and the SMP for commercially using their likeness without consent. The term sheet specifically notes that MSCHF plans to use the recorded IP for \u201cmarketing\u201d and \u201cpromotion.\u201d`,
    law: `Under Civil Code \u00a73344, MSCHF and SMP could face liability for knowingly using \u201canother\u2019s name, voice, signature, photograph, or likeness, in any manner, on or in products, merchandise, or goods, or for purposes of advertising or selling\u2026without that person\u2019s prior consent, or in the case of a minor, the prior consent of their parent.\u201d The California Consumer Privacy Act contains similar language.`,
    solution: `Consider ensuring that the camera is only a capture device for the individual pier-goer participating: the contract should prohibit either the SMP or MSCHF from designing any product version that offers a cloud upload or any other shared content storage. The agreement should also consider an automatic blurring of bystander faces in any video that either party obtains or that is used commercially. Finally, at park entry, consider a general notice that photography and video technology are used throughout the park. Note that any promotional videos using pier-goers\u2019 images would require separate and individual waivers.`,
    tag: 'Station 4',
    color: '#FF8C42',
  },
  {
    type: 'issue',
    title: 'Issue 5: Assumption of Risk and Waiver',
    problem: `Given all these concerns, the term sheet likely should state that the parties agree to institute waivers or statements of a participant\u2019s assumption of the risk, which it does not.`,
    law: `California\u2019s assumption of the risk doctrine protects operators of inherently more dangerous or risky activities against negligence claims. See <em>Knight v. Jewett</em>, 3 Cal. 4th 296, 316 (1992) (explaining that in certain circumstances, \u201cthe careless conduct of others is treated as an \u2018inherent risk\u2019 of a sport, thus barring recovery by the plaintiff.\u201d). The caveat here is that defendants still \u201chave a duty to use due care not to increase the risks to a participant over and above those inherent.\u201d <em>Id.</em>`,
    solution: `To ensure that the traditional assumption of the risk principles apply if, for example, a pier-goer\u2019s phone accidentally breaks while on the Phone Roller Coaster, the SMP should update its existing ride waiver (which is signed at the point of a ticket purchase) to specifically include MSCHF\u2019s device and its risks. This update should also be reflected in the terms sheet, so that both partners are aware.`,
    tag: 'Station 5',
    color: '#F7DC6F',
  },
];

const plaintext = JSON.stringify(slides);
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

const key = crypto.pbkdf2Sync(PASSWORD, salt, 100000, 32, 'sha256');

const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
const authTag = cipher.getAuthTag(); // 16 bytes

const blob = Buffer.concat([salt, iv, encrypted, authTag]);
console.log(blob.toString('base64'));

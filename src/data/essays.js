export const ESSAYS = [
  {
    id: 'ESS-001',
    title: 'LPDP Essay — Rencana Studi & Kontribusi untuk Indonesia',
    scholarshipType: 'LPDP',
    authorAlias: 'Alumni Oxford 2023',
    universityAdmitted: 'University of Oxford',
    tags: ['Rencana Studi', 'Kontribusi', 'Leadership'],
    content: `Sejak kecil, saya menyaksikan bagaimana ketimpangan akses pendidikan membentuk kesenjangan peluang di Indonesia. Pengalaman ini mendorong saya untuk mengambil peran aktif dalam merancang kebijakan publik yang transformatif.

Melalui program MSc Public Policy di University of Oxford, saya berencana mendalami tiga area: evidence-based policymaking, desain program sosial yang inklusif, dan mekanisme pendanaan pendidikan alternatif. Oxford menawarkan akses ke jaringan pembuat kebijakan global yang tidak tertandingi, serta fasilitas riset kelas dunia melalui Blavatnik School of Government.

Setelah menyelesaikan studi, saya berkomitmen kembali ke Indonesia dan bergabung dengan Kemendikbudristek untuk memimpin reformasi kurikulum berbasis kompetensi. Dalam 10 tahun ke depan, saya memiliki visi membangun lembaga think-tank independen yang menjembatani riset akademik dengan implementasi kebijakan nyata di lapangan.

Beasiswa LPDP bukan sekadar dukungan finansial — ini adalah kepercayaan negara kepada anak bangsa untuk membawa pulang ilmu dan dedikasi demi Indonesia yang lebih maju dan berkeadilan.`,
    fileUrl: null,
  },
  {
    id: 'ESS-002',
    title: 'Chevening Personal Statement — Leadership & UK Study Plan',
    scholarshipType: 'Chevening',
    authorAlias: 'Alumni Edinburgh 2022',
    universityAdmitted: 'University of Edinburgh',
    tags: ['Leadership', 'Networking', 'UK Ties'],
    content: `Leadership, for me, is not about titles — it is about creating conditions where others can thrive. This conviction was forged during my three years leading a youth environmental NGO in Java, where I mobilised over 2,000 volunteers to restore degraded coastal ecosystems.

The Chevening Scholarship represents a unique opportunity to bridge my grassroots experience with the rigorous academic and policy frameworks available at the University of Edinburgh's School of Geosciences. My proposed MSc in Climate Change will equip me with the quantitative modelling skills currently absent in Indonesia's climate adaptation planning ecosystem.

The UK-Indonesia connection is deeply personal. I have collaborated with the British Council Indonesia on two youth exchange programmes, and I intend to leverage Chevening's extensive alumni network to strengthen bilateral cooperation on climate finance between our two nations.

Upon returning, I will embed myself within the National Development Planning Agency (Bappenas) to ensure Indonesia's climate commitments translate into funded, measurable action plans at the provincial level.`,
    fileUrl: null,
  },
  {
    id: 'ESS-003',
    title: 'LPDP Essay — Mengapa Saya Layak Mendapat Beasiswa Ini',
    scholarshipType: 'LPDP',
    authorAlias: 'Alumni LSE 2024',
    universityAdmitted: 'London School of Economics',
    tags: ['Motivasi', 'Track Record', 'LPDP'],
    content: `Pertanyaan ini bukan tentang kelayakan akademik semata — ini tentang komitmen untuk mengembalikan setiap sen investasi negara dalam bentuk dampak nyata.

Latar belakang saya sebagai anak petani di Sulawesi Tengah membentuk perspektif yang tidak bisa didapat dari buku teks manapun: bahwa kemiskinan struktural bukan takdir, melainkan kegagalan sistem. Keyakinan inilah yang mendorong saya menyelesaikan S1 Ekonomi Pembangunan dengan IPK 3.89 sambil mengelola usaha pertanian keluarga.

Program MSc Development Economics di LSE akan mempertemukan saya dengan metodologi riset kuantitatif terkini, khususnya Randomised Control Trials (RCT) yang kini menjadi standar emas evaluasi program pemberdayaan. Di bawah bimbingan Prof. Oriana Bandiera — pakar ekonomi gender dan ketenagakerjaan — saya akan meneliti dampak program PKH terhadap mobilitas ekonomi perempuan kepala keluarga.

Saya layak mendapat beasiswa ini bukan karena saya sempurna, tetapi karena saya tahu persis apa yang akan saya lakukan dengan kesempatan ini.`,
    fileUrl: null,
  },
  {
    id: 'ESS-004',
    title: 'AAS Application Essay — Australia Awards Scholarship',
    scholarshipType: 'AAS',
    authorAlias: 'Alumni ANU 2023',
    universityAdmitted: 'Australian National University',
    tags: ['Australia Awards', 'Development', 'Regional'],
    content: `Indonesia and Australia share not just a border, but a common stake in the stability and prosperity of the Indo-Pacific region. My proposed research at ANU's Crawford School directly addresses this shared interest: understanding how decentralised governance models can accelerate sustainable development outcomes in eastern Indonesia.

For five years I have worked with district governments in Nusa Tenggara Timur, witnessing firsthand how the gap between central policy design and local implementation capacity undermines even well-funded programmes. The Master of Public Administration at ANU will provide me with the analytical tools and comparative case studies needed to design more adaptive governance frameworks.

The Australia Awards network — spanning government, academia, and civil society across the region — offers an irreplaceable platform for the cross-border collaboration that today's complex development challenges demand. I am committed to actively contributing to this network, both during my studies and throughout my career in Indonesia's planning institutions.`,
    fileUrl: null,
  },
]

export const SCHOLARSHIP_TYPES = [...new Set(ESSAYS.map(e => e.scholarshipType))]

import type { Subject } from './types';

// TODO: Ganti dengan URL Google Apps Script Anda setelah di-deploy
// FIX: Explicitly type SCRIPT_URL as string to allow comparison with a placeholder value, resolving a TypeScript error.
export const SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbyMWS_AIgjn1k1NDqZ-tpp_H2ihyZaE8Fn3jjqhqXfICVTFy5GwO8wsJqPTXXzkTkjZ/exec';

export const COMPULSORY_SUBJECTS: Subject[] = [
  { id: 'bhs_indonesia', name: 'Bahasa Indonesia' },
  { id: 'bhs_inggris', name: 'Bahasa Inggris' },
  { id: 'matematika', name: 'Matematika' },
];

export const ELECTIVE_SUBJECTS: Subject[] = [
  { id: 'matematika_lanjutan', name: 'Matematika Lanjutan' },
  { id: 'bhs_indonesia_lanjutan', name: 'Bahasa Indonesia Lanjutan' },
  { id: 'bhs_inggris_lanjutan', name: 'Bahasa Inggris Lanjutan' },
  { id: 'fisika', name: 'Fisika' },
  { id: 'kimia', name: 'Kimia' },
  { id: 'biologi', name: 'Biologi' },
  { id: 'sosiologi', name: 'Sosiologi' },
  { id: 'geografi', name: 'Geografi' },
  { id: 'sejarah', name: 'Sejarah' },
  { id: 'antropologi', name: 'Antropologi' },
  { id: 'ppkn', name: 'PPKn/Pendidikan Pancasila' },
  { id: 'ekonomi', name: 'Ekonomi' },
  { id: 'bhs_arab', name: 'Bahasa Arab' },
  { id: 'bhs_prancis', name: 'Bahasa Prancis' },
  { id: 'bhs_jerman', name: 'Bahasa Jerman' },
  { id: 'bhs_jepang', name: 'Bahasa Jepang' },
  { id: 'bhs_korea', name: 'Bahasa Korea' },
  { id: 'bhs_mandarin', name: 'Bahasa Mandarin' },
  { id: 'kewirausahaan', name: 'Produk/Proyek Kreatif dan Kewirausahaan' },
];

export const MAX_ELECTIVE_SELECTIONS = 2;

export const MAJORS_AND_CLASSES: { [major: string]: string[] } = {
  'Akuntansi': ['XII AKL1', 'XII AKL2', 'XII AKL3'],
  'Bisnis Digital': ['XII BD'],
  'Bisnis Ritel': ['XII BR'],
  'Disain dan Produksi Busana': ['XII DPB'],
  'DPIB': ['XII DPIB'],
  'Kuliner': ['XII KL'],
  'Manajemen Perkantoran': ['XII MP1', 'XII MP2', 'XII MP3'],
  'Perhotelan': ['XII PH'],
  'Rekayasa Perangkat Lunak': ['XII RPL1', 'XII RPL2'],
};

export const PROGRAM_STUDI_GUIDE: { [cluster: string]: { name: string; subjects: string[] } } = {
  saintek: {
    name: 'Sains dan Teknologi',
    subjects: ['matematika_lanjutan', 'fisika', 'kimia', 'biologi', 'bhs_inggris_lanjutan']
  },
  soshum: {
    name: 'Sosial dan Humaniora',
    subjects: ['ekonomi', 'sosiologi', 'geografi', 'sejarah', 'antropologi', 'bhs_indonesia_lanjutan', 'bhs_inggris_lanjutan']
  }
};

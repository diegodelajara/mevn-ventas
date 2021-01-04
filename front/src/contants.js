
export const rules = {
  required: [
    v => !!v || ``
  ],
  loginEmailRules: [
    v => !!v || ``,
    v => /.+@.+\..+/.test(v) || "E-mail debe ser válido"
  ],
  rolRequired: [
    v => !!v || 'Ingrese un rol',
    // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ],
  rut: [
    v => !!v || 'Ingrese un rol',
    v => (v && v.length <= 12) || 'Rut debe tener 12 characters',
  ],
  // incomeType: [
  //   v => !!v || '',
  //   // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
  // ],
  // mount: [
  //   v => !!v || '',
  // ],
  // uploadDocument: [
  //   v => !!v || '',
  //   v => (v && v.size <= 2000000) || 'Documento debe pesar menos de 2MB',
  // ],
  // rut: [
  //   v => !!v || '',
  //   v => (v && v.length === 12) || 'Rut debe tener 12 caracteres',
  //   v => validateRut(v) || 'Rut inválido',
  // ]
}
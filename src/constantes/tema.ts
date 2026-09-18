export const tema = {
  colores: {
    fondo: '#F5F4F0',
    superficie: '#FFFFFF',
    texto: '#1C1917',
    textoSuave: '#78716C',
    borde: '#E7E4DE',
    acento: '#C2410C',
    acentoSuave: '#FBF1E9',
    peligro: '#DC2626',
    peligroSuave: '#FCEBEB',
    exito: '#15803D',
    exitoSuave: '#EAF5EE',
  },
  radios: {
    suave: 12,
    medio: 16,
    grande: 24,
  },
  sombra: {
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
} as const;

export const estilosComunes = {
  tarjeta: {
    backgroundColor: tema.colores.superficie,
    borderRadius: tema.radios.medio,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    ...tema.sombra,
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: tema.colores.textoSuave,
  },
} as const;
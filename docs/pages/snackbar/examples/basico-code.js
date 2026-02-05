// Basico
UXSnackbar.show({ message: 'Mensaje enviado' });

// Con opciones
UXSnackbar.show({
  message: 'Archivo eliminado',
  duration: 4000,  // ms, 0 = no auto-dismiss
  closable: true
});

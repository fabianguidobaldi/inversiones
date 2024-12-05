function esDiaDeHoy(fecha: Date): boolean {
  let today = new Date();

  if (fecha.toDateString() == today.toDateString()) {
    return true;
  }
  return false;
}

const DEVICE_DB = {
  products: {
    0x2328: { name: "KNIFE",     sensor: null },
    0x2329: { name: "SA-ML01",   sensor: "PAW3395" },
    0x232a: { name: "Receiver",  sensor: null },
    0x232b: { name: "Receiver 8K", sensor: null },
    0x232c: { name: "SA-MH01",   sensor: "PAW3395" },
    0x232d: { name: "SA-SL01",   sensor: "PAW3395" },
    0x232e: { name: "SA-SH01",   sensor: "PAW3395" },
    0x232f: { name: "GS-SH01",   sensor: null },
    0x2330: { name: "ER21",      sensor: null },
    0x2331: { name: "ES21",      sensor: "PAW3950" },
    0x2332: { name: "ES21Pro",   sensor: "PAW3950" },
    0x2334: { name: "ER21M",     sensor: "PAW3950" },
    0x2335: { name: "ER21Pro",   sensor: null },
    0x2336: { name: "ER21Pro",   sensor: null },
    0x2337: { name: "ES21M",     sensor: "PAW3950" },
    0x2338: { name: "MH01Pro",   sensor: "PAW3950" },
    0x2339: { name: "SH01Pro",   sensor: "PAW3950" },
  },

  getSensor(productId) {
    var product = DEVICE_DB.products[productId];
    return product ? product.sensor : null;
  },

  getName(productId) {
    var product = DEVICE_DB.products[productId];
    return product ? product.name : null;
  },

  nameSensorFallbacks: {
    "SA-ML01":   "PAW3395",
    "SA-MH01":   "PAW3395",
    "SA-SL01":   "PAW3395",
    "SA-SH01":   "PAW3395",
    "ES21":      "PAW3395",
    "SA-MH01Pro": "PAW3950",
    "SA-SH01Pro": "PAW3950",
    "ES21Pro":   "PAW3950",
    "ES21M":     "PAW3950",
    "ER21Pro":   "PAW3950",
    "ER21M":     "PAW3950",
  },

  getSensorByName(deviceName) {
    var sensor = DEVICE_DB.nameSensorFallbacks[deviceName];
    return sensor !== undefined ? sensor : null;
  },
};

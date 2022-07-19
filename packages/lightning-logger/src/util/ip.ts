import os from 'os';
import net from 'net';

function ip() {
  const ifs = os.networkInterfaces();
  const keys = Object.keys(ifs);

  let hostIPV4 = '';
  let hostIPV6 = '';

  for (let i = 0; i < keys.length; i++) {
    for (const item of ifs[keys[i]] || []) {
      if (!item.internal && net.isIPv4(item.address) && !hostIPV4) {
        hostIPV4 = item.address;
      }
      if (!item.internal && net.isIPv6(item.address) && !hostIPV6) {
        hostIPV6 = item.address;
      }

      if (hostIPV4 && hostIPV6) {
        break;
      }
    }

    if (hostIPV4 && hostIPV6) {
      break;
    }
  }

  return {
    hostIPV4,
    hostIPV6,
  };
}

export const { hostIPV4, hostIPV6 } = ip();
export const hostIp = hostIPV4 || hostIPV6;

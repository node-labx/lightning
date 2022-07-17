import net from 'net';
import { hostIPV4, hostIPV6, hostIp } from '../../src/util/ip';

test('# hostIp', () => {
  expect(net.isIPv4(hostIPV4)).toBeTruthy();
  expect(net.isIPv6(hostIPV6)).toBeTruthy();
  expect(net.isIP(hostIp)).toBeTruthy();
});

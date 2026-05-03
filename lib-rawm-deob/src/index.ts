import '../data/constants.js';
import '../data/key-database.js';
import '../state/key-lookup.js';
import '../state/device-store.js';
import '../state/kbd-structures.js';
import '../protocol/buffer.js';
import '../protocol/hid-transport.js';
import '../protocol/hs-parser.js';
import '../protocol/hid-parser.js';
import '../protocol/binary-reader.js';
import '../protocol/key-config-parser.js';
import '../protocol/hs-protocol.js';
import '../protocol/hid-protocol.js';
import '../data/device-database.js';
import '../protocol/http-data-model.js';
import '../protocol/parse-cmd-ui.js';
import '../ui/ui-clients.js';
import '../ui/ui-helpers.js';
import '../ui/ui-settings.js';
import '../ui/ui-mapping.js';
import '../lib/utilities.js';
import '../ui/event-dispatch.js';
import '../ui/ui-keyboard.js';

import { shell_cmd_app_browse_file } from '../ui/ui-mapping.js';
import { initDeviceStoreHandlers } from '../ui/event-dispatch.js';

window.shell_cmd_app_browse_file = shell_cmd_app_browse_file;
initDeviceStoreHandlers();

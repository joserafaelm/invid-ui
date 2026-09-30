import { withINVIDUI } from "@invid/ui/metro";
import { getDefaultConfig } from "expo/metro-config.js";

const config = getDefaultConfig(import.meta.dirname);

export default withINVIDUI(config);

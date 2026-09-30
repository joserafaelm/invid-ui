import path from "node:path";
import { withINVIDUI } from "@invid/ui/metro";
import { withStorybook } from "@storybook/react-native/metro/withStorybook";
import { getDefaultConfig } from "expo/metro-config.js";

const config = getDefaultConfig(import.meta.dirname);

const storybookConfig = withStorybook(config, {
  configPath: path.join(import.meta.dirname, ".rnstorybook"),
});

export default withINVIDUI(storybookConfig);

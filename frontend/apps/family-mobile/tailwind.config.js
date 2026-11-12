module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/ui-native/src/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset"), require("@aulia/theme/preset")],
};

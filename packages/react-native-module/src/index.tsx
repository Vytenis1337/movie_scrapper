import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-academy-module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type AcademyModuleProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'AcademyModuleView';

export const AcademyModuleView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<AcademyModuleProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

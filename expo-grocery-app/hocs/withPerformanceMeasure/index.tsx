import { ComponentProps } from 'react';
import { PerformanceMeasureView } from '@shopify/react-native-performance';

export const withPerformanceMeasure = ({
  children,
  ...props
}: ComponentProps<typeof PerformanceMeasureView>) => {
  if (__DEV__) {
    return (
      <PerformanceMeasureView {...props}>{children}</PerformanceMeasureView>
    );
  }

  return children;
};

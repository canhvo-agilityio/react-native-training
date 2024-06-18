import { useEffect, useState } from 'react';
import { DevSettings } from 'react-native';

// Components
import { Navigation } from './src/navigation';

const App = () => {
  const [showStorybook, setShowStorybook] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      // Toggle Storybook
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook(prev => !prev);
      });
    }
  }, []);

  if (showStorybook) {
    const StorybookUI = require('./.storybook').default;
    return <StorybookUI />;
  }

  return <Navigation />;
};

export default App;

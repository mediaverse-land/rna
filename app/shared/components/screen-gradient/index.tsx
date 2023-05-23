import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { stickyStyles } from '../../../styles/sticky';

export function ScreenGradient({ children }: { children: ReactNode }) {
    return (
        <LinearGradient
            style={[stickyStyles.container]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            {children}
        </LinearGradient>
    );
}

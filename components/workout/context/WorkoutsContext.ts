import { createContext, useContext } from 'react';

const WorkoutsContext = createContext<{
    stateChanged: boolean;
    setStateChanged: (stateChanged: boolean) => void;
} | null>(null);

export function useWorkoutsContext() {
    const context = useContext(WorkoutsContext);
    if (context === null) {
        throw new Error('useWorkoutsContext must be used within a WorkoutsProvider');
    }
    return context;
}
export default WorkoutsContext;

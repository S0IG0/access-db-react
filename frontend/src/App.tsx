import {FC, useState} from 'react';
import {CssVarsProvider, ScopedCssBaseline} from "@mui/joy";
import AccessDB from "./AccessDB.tsx";


const App: FC = () => {
    const [root, setRoot] = useState<HTMLDivElement | null>(null);
    return (
        <CssVarsProvider colorSchemeNode={root}>
            <ScopedCssBaseline ref={(element) => setRoot(element)}>
                <AccessDB/>
            </ScopedCssBaseline>
        </CssVarsProvider>
    );
};

export default App;
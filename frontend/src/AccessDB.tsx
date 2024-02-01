import {FC, useState} from 'react';
import {Button, Card, Divider, FormControl, FormHelperText, FormLabel, Stack, Typography} from "@mui/joy";
import ReactJson from 'react-json-view'
import axios from "axios";
import AceEditor from "react-ace";
import {Ace} from "ace-builds";

import 'brace/mode/sql';
import 'brace/theme/sqlserver';
import 'brace/ext/language_tools'
import useIpAddress from "./useIpAddress.ts";

const AccessDb: FC = () => {
    const onLoad = (editor: Ace.Editor) => {
        editor.getSession().setMode("ace/mode/sql");
        editor.getSession().setUseWorker(false);
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });
    };

    const [value, setValue] = useState("SELECT name FROM sqlite_master WHERE type='table';")
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false);

    const ipAddress = useIpAddress();

    const makeRequestDB = () => {
        setLoading(true)
        axios.post(`http://${ipAddress === null || ipAddress === "95.31.11.209" ? "192.168.1.64" : "95.31.11.209"}:8018/query/`, {
            sql: value,
        })
            .then(response => {
                console.log(response)
                setResult(response.data)
            })
            .finally(() => {
                setLoading(false)
            });
    }

    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={4}
        >
            <FormControl
                sx={{
                    width: 500,
                }}
            >
                <FormLabel>Взаимедейтсвие с базой данных</FormLabel>
                <AceEditor
                    style={{
                        borderRadius: 15,
                    }}
                    mode="sql"
                    theme="sqlserver"
                    onChange={value => setValue(value)}
                    value={value}
                    name="sql-editor"
                    editorProps={{$blockScrolling: true}}
                    width="100%"
                    height="150px"
                    fontSize={14}
                    showPrintMargin={false}
                    onLoad={onLoad}
                />
                <FormHelperText>
                    Сюда нужно писать sql код для получение данных из бд
                    в каких то таблицах записан код, возможно он разбит на несколько частей.
                    Все может быть не так однозначно.
                </FormHelperText>
                <Button
                    onClick={makeRequestDB}
                    loading={loading}
                >Сделать запрос</Button>
            </FormControl>

            <Card variant="outlined" sx={{width: 500}}>
                <Typography level="h3" textAlign="center">Результат выполнения</Typography>
                <Divider orientation="horizontal"/>
                <Typography>
                    <ReactJson
                        src={result}
                        name={false}
                        collapsed={false}
                        displayDataTypes={false}
                        displayObjectSize={false}
                    />
                </Typography>
            </Card>
        </Stack>
    );
};

export default AccessDb;
import 'twin.macro';

import { Widget } from './types';
import WarningIcon from '../icons/Warning';
import { useDataset } from '../lib';
import { DatasetIssue } from '../types';

interface IssueProps {
    problem: DatasetIssue;
}
const Issue = ({ problem }: IssueProps): JSX.Element => {
    const selectRows = () => useDataset.getState().selectRows(problem.rows);
    const highlight = () => useDataset.getState().highlightRows(problem.rows);
    const dehighlight = () => useDataset.getState().dehighlightAll();

    return (
        <button
            tw="flex flex-row px-1 h-7 text-xs items-center bg-yellow-100 border-b-yellow-600 border overflow-hidden align-middle"
            onClick={selectRows}
            onMouseOver={highlight}
            onFocus={highlight}
            onMouseLeave={dehighlight}
        >
            <WarningIcon tw="text-yellow-600 h-5 w-5 mx-0.5" />
            <div tw="rounded-full border border-yellow-600 text-xxs h-4 flex items-center justify-center whitespace-nowrap px-2 align-middle items-center align-middle mx-0.5">
                {problem.rows.length}
            </div>
            <div tw="flex-grow flex text-start items-center align-middle mx-1">
                {problem.description}
            </div>
        </button>
    );
};

const IssuesWidget: Widget = () => {
    const issues = useDataset((d) => d.issues);

    return (
        <div tw="flex flex-col">
            {issues.map((problem, i) => (
                <Issue key={i} problem={problem} />
            ))}
        </div>
    );
};

IssuesWidget.key = 'IssuesWidget';
IssuesWidget.defaultName = 'Issues';
IssuesWidget.icon = WarningIcon;
export default IssuesWidget;
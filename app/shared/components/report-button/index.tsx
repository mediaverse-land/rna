import { RowAlignCenter } from '../../../styles/grid';
import { ReportBtnComponent, ReportBtnComponentText } from './style';

export function ReportButton() {
    return (
        <RowAlignCenter>
            <ReportBtnComponent>
                <ReportBtnComponentText>Report...</ReportBtnComponentText>
            </ReportBtnComponent>
        </RowAlignCenter>
    );
}

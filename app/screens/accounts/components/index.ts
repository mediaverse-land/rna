import { AccountsScreenFooterComponent } from "./footer";
import { AccountsScreenListComponent } from "./list";
import { SelectAccountTypeMemo } from "./select-account-type";
// import { SelectAccountBottomSheetComponent } from "./select-account-type";
import { AccountsScreenTitleComponent } from "./title";

export const AccountsSCreenComponents = {
  Title: AccountsScreenTitleComponent,
  List: AccountsScreenListComponent,
  Footer: AccountsScreenFooterComponent,
  SelectAccountBottomSheet: SelectAccountTypeMemo,
};

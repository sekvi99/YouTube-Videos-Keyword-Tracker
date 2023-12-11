import { Pipe, PipeTransform } from '@angular/core';
import { roleToRoleLabel } from '../models/user/user.roles';

@Pipe({
    name: 'UserRoleLabel'
})
export class UserRolePipe implements PipeTransform {
    transform(roleId: string | null | undefined): string {
        return this.mapRoleToLabel(roleId ?? "") ?? "Nieznana rola"; 
    }

    private mapRoleToLabel(role: string): string {
        return roleToRoleLabel[role] ?? "Nieznana rola";
    }
}
export class UtilsHelpers {
    public static data = {
        sorting: (array: any, field: any): any => {
            return array.sort((a, b) => {
                var x = a[field]; var y = b[field];
                return ((x < y) ? -1 : ((x < y) ? 1 : 0));
            });
        },

    }
    public static number = {
        formatCurrency: (valor: number): string => {
            return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
        }
    }
}
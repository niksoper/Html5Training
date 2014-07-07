import d3 = require('d3');
import explorer = require('controllers/explorer');
import petri = require('directives/Petri');

export function TxPetri(): any {    

    var petriDirective: any = {
        restrict: 'E',
        templateUrl: 'ts/directives/txpetri.html',
        scope: {
            block: '=',
            dishSize: '=',
            germSize: '=',
            germSpeed: '='
        },
        link: (
            scope: any,
            element: ng.IAugmentedJQuery,
            attrs: ng.IAttributes): void => {

            var size: number = scope.dishSize || 70;
            var halfSize: number = size / 2;

            var svg = d3.select(element[0]).select('svg')
                .attr('width', size)
                .attr('height', size);

            var dish = new petri.Petri(
                svg,
                halfSize,
                halfSize,
                halfSize - 2,
                scope.block.txValues,
                scope.germSize || 1);

            var animate = function animate(): boolean {

                dish.moveGerms();

                return false

            }

            d3.timer(animate);
        }

    };

    return petriDirective;
}
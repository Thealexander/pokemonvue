import { shallowMount } from "@vue/test-utils";
import getPokemonOptions from "@/helpers/getPokemonOptions";

import { pokemons } from '../mocks/pokemons.mock'


describe('PokemonOptions Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(getPokemonOptions, {
            props: {
                pokemons
            }
        })
    });

    test('debo de hacer match con el snapshot', () => {

        //console.log(wrapper.html())

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('debe mostrar las 4 opciones correctamente', () => {

        const liTags = wrapper.findAll('li')
        expect(liTags.length).toBe(4)

        expect(liTags[0].text()).toBe('pikachu')
        expect(liTags[1].text()).toBe('mew')
        expect(liTags[2].text()).toBe('venusaur')
        expect(liTags[3].text()).toBe('raichu')

    })

    test('debe de emitir "seleccion" con sus respectivos parametros al hacer click', () => {

        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click')

        console.log(wrapper.emitted('selectionPokemon'))

        expect(wrapper.emitted('selectionPokemon').length).toBe(1)
        expect(wrapper.emitted('selectionPokemon'[0]).toEqual([5]))

    })
})
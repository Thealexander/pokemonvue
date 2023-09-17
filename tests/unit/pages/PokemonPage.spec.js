import { shallowMount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'


describe('PokemonPage Component', () => {

    let wrapper

    beforeEach(() => {

        wrapper = shallowMount(PokemonPage)

    })

    test('debe hacer match con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('debe llamar mixPokemonArray al montar', () => {

        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        const wrapper = shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                };
            },
        })
        // ejecutar:
        expect(wrapper.html()).toMatchSnapshot()

    })

    test('debe mostrar los componentes de PokemonPicture y Pokemon Options', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                };
            },
        })
        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')

        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()

        //PokemonPicture debe de existir
        //PokemonOptions debe de existir

        expect(picture.attributes('pokemonid')).toBe('5')
        expect(options.attributes('pokemonid')).toBeTruthy()

    })

    test('pruebas con checkAnswer', async () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                };
            },
        })
        //COMPROBAR COMPONENTE
        await wrapper.vm.checkAnswer(5)

        expect(wrapper.find(h2).exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBe(true)
        expect(wrapper.find('h2').text()).toBe(`Te luciste!, si es ${pokemon[0].name}`)


        await wrapper.vm.checkAnswer(10)

        expect(wrapper.vm.message).toBe(`Valiste verga Sherk', era ${pokemon[0].name}`)

    })

})
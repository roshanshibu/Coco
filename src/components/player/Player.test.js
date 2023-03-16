const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

import { mount } from "enzyme"
import { PlayerContext } from "../../MainRoutes"
import Player from "./Player"

describe("Player screen", () =>{
    const component = (prop, isFullScreen) => {
        return (
            mount(
                
                <PlayerContext.Provider 
                    value={{playingSongId : 1, 
                            setPlayingSongId : jest.fn(), 
                            g_miniplayer : !isFullScreen, 
                            setGMiniPlayer : jest.fn()}}>
                    <Player {...prop} />
                </PlayerContext.Provider>
            )
        )
    }

    let wrapper = null

    beforeEach(() => {
        wrapper = component()
    })
    
    it('is rendered', () => {
        const player = wrapper.find({"data-testid":"PlayerScreen"})
        expect(player.length).toBe(1)
    })

    it('can switch to full screen', () => {
        wrapper = component({}, true)
        expect(wrapper.find(".miniplayer").length).toBe(0)
    })

    it('can switch to miniplayer', () => {
        wrapper = component({}, false)
        expect(wrapper.find(".miniplayer").length).toBe(1)
    })
    
})
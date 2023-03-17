
import Chorus from "./Chorus"
import { mount } from "enzyme"
import { PlayerContext } from "../../MainRoutes"
// import {getChorusPage}  from "../../api/chorus"
import * as chorus from '../../api/chorus';


// jest.mock('../../api/chorus', () => jest.fn());

describe("Chorus screen", () =>{
    const component = (prop) => {
        return (
            mount(
                <PlayerContext.Provider 
                    value={{playingSongId : 1, 
                            setPlayingSongId : jest.fn(), 
                            g_miniplayer : true, 
                            setGMiniPlayer : jest.fn()}}>
                    <Chorus {...prop} />
                </PlayerContext.Provider>
            )
        )
    }

    let wrapper = null

    beforeEach(() => {
        wrapper = component()
    })
    
    it('is rendered', () => {
        const chorus = wrapper.find({"data-testid":"chorusPage"})
        expect(chorus.length).toBe(1)
    })
    
    // it('loads some cards', () => {
        
    //     // getChorusPage.mockReturnValue('Monday')
    //     // (getChorusPage).mockResolvedValue(resp)
    //     // wrapper.instance().getChorusPage = jest.fn();
    //     expect(wrapper.find({"data-testid":"chorusCard"}).length).toBe(1)
    // })
    
})
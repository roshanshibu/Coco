import Dashboard from "./Dashboard"
import { mount } from "enzyme"
import { PlayerContext, UserContext } from "../../MainRoutes"

describe("Dashboard screen", () =>{
    const component = (prop) => {
        return (
            mount(
                <PlayerContext.Provider 
                    value={{playingSongId : 1, 
                            setPlayingSongId : jest.fn(), 
                            g_miniplayer : true, 
                            setGMiniPlayer : jest.fn()}}>
                    <UserContext.Provider 
                        value={{currentUserId : 1, setCurrentUserId : jest.fn()}}>
                        <Dashboard {...prop} />
                    </UserContext.Provider>
                </PlayerContext.Provider>
            )
        )
    }

    let wrapper = null

    beforeEach(() => {
        wrapper = component()
    })
    
    it('is rendered', () => {
        const dash = wrapper.find({"data-testid":"dashPage"})
        expect(dash.length).toBe(1)
    })

    it('Renders Header', () => {
        const header = wrapper.find({"data-testid":"header"})
        expect(header.length).toBe(1)
    })

    it('Renders User Toggle Button', () => {
        const userButton = wrapper.find({"data-testid":"userImage"})
        expect(userButton.length).toBe(1)
    })
    
})
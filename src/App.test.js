import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import App from "./App"
import React from "react"

describe('App Component', () => {
    const pauseStub = jest
    .spyOn(window.HTMLMediaElement.prototype, 'pause')
    .mockImplementation(() => {})
    
    let wrapper = null

    const component = (path) => {
        return mount(
            <MemoryRouter initialEntries={[`${path}`]}> 
                <App />
            </MemoryRouter>
            ) //for deep rendering of App component
    }

    beforeEach(() => {
        wrapper = component("/");
    })
    it("is Rendered with dashboard on start", () => {
        const app = wrapper.find({"data-testid":"dashboard"})
        expect(app.length).toBe(1)
    })
})
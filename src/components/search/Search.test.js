import { mount } from "enzyme";
import Search from "./Search";


describe("searchcomponent", () =>{

    const component = (props) => {
        return mount(<Search {...props} />);    
    };

    let wrapper = null;

    beforeEach(() => {
        wrapper = component();

    });
    
    it("is Search rendered", () => {
        const Search = wrapper.find(".searchPage");
        expect(Search.length).toBe(1);
    });

    it("is Search Box rendered", () => {
        const SearchBox = wrapper.find(".searchBox");
        expect(SearchBox.length).toBe(1);
    });

    it("Does Previous Searches rendered", () => {
        const PreviousSearches = wrapper.find(".previousSearchContainer");
        expect(PreviousSearches.length).toBe(1);
    });

});

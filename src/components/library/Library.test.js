import { mount } from "enzyme";
import Library from "./Library";
import { PlayerContext, UserContext } from "../../MainRoutes"


// describe("Librarycomponent", () =>{

//     const component = (props) => {
//         return mount(
//                         <UserContext.Provider value={{currentUserId : 2, setCurrentUserId : jest.fn()}}>
//                             <Library {...props} />
//                         </UserContext.Provider>
//                     );    
//     };

//     let wrapper = null;

//     beforeEach(() => {
//         wrapper = component();

//     });
    
//     it("is Library Header rendered", () => {
//         const LibraryHeader = wrapper.find(".library-header");
//         expect(LibraryHeader.length).toBe(1);
//     });

//     it("is correct product name rendered", () => {
//         const LibraryHeaderProductName = wrapper.find(".library-header-productName");
//         expect(LibraryHeaderProductName.text()).toEqual("coco");
//     });

//     it("is Library Content rendered", () => {
//         const LibraryContent = wrapper.find(".library-content");
//         expect(LibraryContent.length).toBe(1);
//     });

//     it("Does all components rendered", () => {
//         const LibraryHeaderProductName = wrapper.find(".library-tab-content");
//         expect(LibraryHeaderProductName.length).toEqual(3);
//     });

//     it("Does all Playlists rendered", () => {
//         const LibraryHeaderProductName = wrapper.find(".library-tab-playlist-body");
//         expect(LibraryHeaderProductName.length).toEqual(1);
//     });

// });

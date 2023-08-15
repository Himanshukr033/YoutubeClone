import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChannelDetail, VideoDetail, SearchFeed, Feed, Roots } from './components';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots/>,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "video/:id",
        element: <VideoDetail />,
      },
      { path: "channel/:id", element: <ChannelDetail /> },
      {
        path: "search/:searchTerm",
        element: <SearchFeed />,
      },
    ],
  },
])

const App = () => (
  <>
  <RouterProvider router={router}>
  </RouterProvider>
  </>
);

export default App;

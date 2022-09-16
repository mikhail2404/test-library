import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { StoreLocatorProvider } from "../context/StoreLocatorProvider";

import Loader from "./components/Loader";

const StoreLocatorComponent = lazy(() => import("./StoreLocator"));

const storeLocatorStylesIntimina = {
  searchBoxStyles: {
    searchIconStyles: {
      color: "#E91986"
    },
    placeholderStyles: {
      color: "#F27EA1"
    }
  },
  storeStyles: {
    titleStyles: {
      color: "#F27EA1"
    },
    websiteStyles: {
      color: "#E91986",
      borderBottomColor: "#E91986"
    }
  },
  storesStyles: {
    scrollbarTrackStyles: {
      background: "#f2adbf"
    },
    scrollbarThumbStyles: {
      background: "#E91986"
    }
  },
  markerStyles: {
    activeCityIconStyles: {
      borderColor: "#E91986",
      backgroundColor: "#E91986"
    },
    cityIconStyles: {
      backgroundColor: "#E91986"
    },
    pinIconStyles: {
      backgroundColor: "#005DBE",
      fill: "#E91986"
    }
  },
  noStoresStyles: {
    background: "#e91986",
    border: "none",
    hoverBackground: "#e91986"
  }
};

const storeLocatorStylesLelo = {
  searchBoxStyles: {
    searchIconStyles: {
      color: "#0B0C0D"
    },
    placeholderStyles: {
      color: "#0b0c0d"
    }
  },
  storeStyles: {
    websiteStyles: {
      color: "#0b0c0d",
      borderBottomColor: "#0b0c0d"
    }
  },
  storesStyles: {
    scrollbarTrackStyles: {
      background: "grey"
    },
    scrollbarThumbStyles: {
      background: "#0b0c0d"
    }
  },
  markerStyles: {
    activeCityIconStyles: {
      borderColor: "#0b0c0d",
      backgroundColor: "#0b0c0d"
    },
    cityIconStyles: {
      backgroundColor: "#0b0c0d"
    },
    pinIconStyles: {
      backgroundColor: "red",
      fill: "#000000"
    }
  }
};

const StoreLocator = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <StoreLocatorProvider>
          <StoreLocatorComponent
            storeLabel="L"
            styles={storeLocatorStylesIntimina}
        />
        </StoreLocatorProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default StoreLocator;

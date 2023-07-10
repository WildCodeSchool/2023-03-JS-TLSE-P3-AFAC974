import React from "react";
import ArtworksAdministration from "./ArtworksAdministration";
import ArtistAdministration from "./ArtistAdministration";

export default function AdminHome() {
  return (
    <div>
      <div className="border-solid border-2 border-red-600">
        <ArtworksAdministration />
      </div>
      <div>
        <ArtistAdministration />
      </div>
    </div>
  );
}

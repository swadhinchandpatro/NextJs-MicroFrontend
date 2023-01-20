import React from "react";
import { GET_FILMS_LIST_SERVICE } from "../services/constants";
import { useService } from "../services";

// ! Dummy Component made for testing purposes only , 
// !be used only for reference purposes

export default function DummyPage() {
  const { data , } = useService(GET_FILMS_LIST_SERVICE);

  //console.log(data);

  return <div>Check Console for API Response</div>;
}

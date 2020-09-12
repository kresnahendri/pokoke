/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import * as renderer from "react-test-renderer";

import AppBar from "../components/AppBar";
import Container from "../components/Container";
import EmptyResult from "../components/EmptyResult";
import Pill from "../components/Pill";
import PokeCard from "../components/PokeCard";
import PokeTypeBadge from "../components/PokeTypeBadge";
import ProgressLine from "../components/ProgressLine";
import Spacer from "../components/Spacer";
import Text from "../components/Text";

describe("Copmonents", () => {
  it("snapshot test - AppBar", () => {
    const tree = renderer.create(<AppBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("snapshot test - Container", () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("snapshot test - EmptyResult", () => {
    const tree = renderer
      .create(<EmptyResult text="Testing Empty Result" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("snapshot test - Pill", () => {
    const tree = renderer
      .create(<Pill value="Pill" isActive={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("snapshot test - PokeCard", () => {
    const tree = renderer.create(<PokeCard name="poketest" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("snapshot test - PokeTypeBadge", () => {
    const tree = renderer
      .create(
        <PokeTypeBadge
          types={[
            {type: {name: "dragon", url: "http://blabla"}, slot: 1},
            {type: {name: "finger", url: "http://blabla"}, slot: 2},
          ]}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("snapshot test - ProgressLine", () => {
    const tree = renderer.create(<ProgressLine percentage={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("snapshot test - Spacer", () => {
    const tree = renderer.create(<Spacer height={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("snapshot test - Text", () => {
    const tree = renderer.create(<Text value="Test Text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

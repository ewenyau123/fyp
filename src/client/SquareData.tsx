import { Square } from "./Square";
import { Section } from "./Section";

interface ConfigData {
  readonly type: Square;
  readonly section: Section;
  readonly groupId?: number;
}

const squareGroupColorMap = new Map<number, string>([
  [1, "dark-purple"], [2, "light-blue"], [3, "purple"], [4, "orange"], [5, "red"], [6, "yellow"], [7, "green"], [8, "dark-blue"],
  [15, "island-color"]
]);



const ConfigData = new Map<number, ConfigData>();
ConfigData.set(1, { type: Square.Go, section: Section.Bottom });
ConfigData.set(2, { type: Square.Property, section: Section.Bottom, groupId: 1 });
ConfigData.set(3, { type: Square.Chance, section: Section.Bottom });
ConfigData.set(4, { type: Square.Property, section: Section.Bottom, groupId: 1 });
ConfigData.set(5, { type: Square.Property, section: Section.Bottom, groupId: 15 });

ConfigData.set(6, { type: Square.Airport, section: Section.Bottom, groupId: 10 });

ConfigData.set(7, { type: Square.Property, section: Section.Bottom, groupId: 2 });
ConfigData.set(8, { type: Square.Chance, section: Section.Bottom });
ConfigData.set(9, { type: Square.Property, section: Section.Bottom, groupId: 2 });
ConfigData.set(10, { type: Square.Property, section: Section.Bottom, groupId: 2 });

ConfigData.set(11, { type: Square.Jail, section: Section.Bottom });

ConfigData.set(12, { type: Square.Property, section: Section.Left, groupId: 3 });
ConfigData.set(13, { type: Square.Chance, section: Section.Left });
ConfigData.set(14, { type: Square.Property, section: Section.Left, groupId: 3 });
ConfigData.set(15, { type: Square.Property, section: Section.Left, groupId: 3 });

ConfigData.set(16, { type: Square.Airport, section: Section.Left, groupId: 10 });

ConfigData.set(17, { type: Square.Property, section: Section.Left, groupId: 4 });
ConfigData.set(18, { type: Square.Utility, section: Section.Left });
ConfigData.set(19, { type: Square.Property, section: Section.Left, groupId: 4 });
ConfigData.set(20, { type: Square.Property, section: Section.Left, groupId: 4 });

ConfigData.set(21, { type: Square.CentralPark, section: Section.Top });

ConfigData.set(22, { type: Square.Property, section: Section.Top, groupId: 5 });
ConfigData.set(23, { type: Square.Chance, section: Section.Top });
ConfigData.set(24, { type: Square.Property, section: Section.Top, groupId: 5 });
ConfigData.set(25, { type: Square.Property, section: Section.Top, groupId: 5 });

ConfigData.set(26, { type: Square.Airport, section: Section.Top, groupId: 10 });

ConfigData.set(27, { type: Square.Property, section: Section.Top, groupId: 6 });
ConfigData.set(28, { type: Square.Chance, section: Section.Top });
ConfigData.set(29, { type: Square.Property, section: Section.Top, groupId: 6 });
ConfigData.set(30, { type: Square.Property, section: Section.Top, groupId: 6 });

ConfigData.set(31, { type: Square.GoToJail, section: Section.Top });

ConfigData.set(32, { type: Square.Property, section: Section.Right, groupId: 7 });
ConfigData.set(33, { type: Square.Chance, section: Section.Right });
ConfigData.set(34, { type: Square.Property, section: Section.Right, groupId: 7 });
ConfigData.set(35, { type: Square.Property, section: Section.Right, groupId: 7 });

ConfigData.set(36, { type: Square.Airport, section: Section.Right, groupId: 10 });

ConfigData.set(37, { type: Square.Utility, section: Section.Right });

ConfigData.set(38, { type: Square.Property, section: Section.Right, groupId: 8 });
ConfigData.set(39, { type: Square.Chance, section: Section.Right });
ConfigData.set(40, { type: Square.Property, section: Section.Right, groupId: 8 });

export { ConfigData, squareGroupColorMap };
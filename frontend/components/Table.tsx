import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


const TableRow = ({ data }: any) => {
	return (
		<View
			style={{
				flexDirection: "row",
				borderBottomWidth: 1,
				borderColor: "black",
			}}
		>
			{data.map((cell: any, index: any) => (
				<View key={index} style={{ flex: 1, padding: 8 }}>
					<Text>{cell}</Text>
				</View>
			))}
		</View>
	);
};

const Table = ({ header, rows }: any) => {
	return (
		<View style={{ borderWidth: 1, borderColor: "black", marginVertical: 10 }}>
			{header && <TableRow data={header} />}
			{rows.map((row: any, index: any) => (
				<TouchableOpacity key={index} style={{ flexDirection: "column" }}>
					<TableRow data={row} />
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Table;

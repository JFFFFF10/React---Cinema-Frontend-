import fakeData from "./MOCK_DATA.json";
import * as React from "react";
import { useTable } from "react-table";
import { useState } from "react";
import "./UserAdminPage.css"; // import CSS file inside the component

function UserAdminPage() {
	const data = React.useMemo(() => fakeData, []);
	const columns = React.useMemo(
		() => [
			{
				Header: "Username",
				accessor: "username",
			},
			{
				Header: "Email",
				accessor: "email",
			},
			{
				Header: "Role",
				accessor: "role",
			},
			{
				Header: "is_active",
				accessor: "is_active",
				Cell: ({ value }) =>
					value ? (
						<span style={{ color: "green", textAlign: "center" }}>✔</span>
					) : (
						<span style={{ color: "red", textAlign: "center" }}>✘</span>
					),
				style: {
					textAlign: "center",
				},
			},
		],
		[]
	);

	const [searchText, setSearchText] = useState("");

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	const filteredData = data.filter((item) =>
		item.username.toLowerCase().includes(searchText.toLowerCase())
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: filteredData });

	return (
		<div className="uapage--BigTable">
			<input
				type="text"
				placeholder="Search"
				className="uapage--searchBar"
				value={searchText}
				onChange={handleSearch}
			></input>
			<div className="uapage--container">
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.length > 0 ? (
							rows.map((row) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => (
											<td {...cell.getCellProps()} style={cell.column.style}>
												{cell.render("Cell")}
											</td>
										))}
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan={columns.length} style={{ textAlign: "center" }}>
									No username found in the database.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default UserAdminPage;

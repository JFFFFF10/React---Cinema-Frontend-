import * as React from "react";
import { useTable } from "react-table";
import { useState, useEffect } from "react";
import "./UserAdminPage.css"; // import CSS file inside the component
import UAPopup from "./popup/UAPopup";

function UserAdminPage() {
	const [data, setData] = useState([]);
	const columns = React.useMemo(
		() => [
			{
				Header: "Username",
				accessor: "username",
				Cell: ({ value, row }) => (
					<a
						href="#"
						onClick={() => {
							setSelectedUser(row.original);
							setOpenPopup(true);
						}}
						className="userAdmin--username"
						style={{ color: "lightblue", textDecoration: "underline" }}
					>
						{value}
					</a>
				),
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
					) : null,
				style: {
					textAlign: "center",
				},
			},
		],
		[]
	);

	const [searchText, setSearchText] = useState("");
	const [openPopup, setOpenPopup] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		fetch("https://csit-314-cinema-booking-system.vercel.app/")
			.then((response) => response.json())
			.then((data) => setData(data))
			.catch((error) => console.error(error));
	}, []);

	const filteredData = data.filter((item) =>
		item.username.toLowerCase().includes(searchText.toLowerCase())
	);

	// Add empty objects to filteredData until it has a length of 9
	while (filteredData.length < 9) {
		filteredData.push({});
	}

	const allRowsEmpty = filteredData.every(
		(item) => Object.keys(item).length === 0
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: filteredData });

	return (
		<>
			<div className="userAdmin--BigTable">
				<div className="userAdmin--toolbar">
					<div className="userAdmin--searchContainer">
						<input
							type="text"
							placeholder="Search"
							className="userAdmin--searchBar"
							value={searchText}
							onChange={handleSearch}
						/>
					</div>
					<button
						className="userAdmin--adduserButton"
						onClick={() => console.log("Add user clicked")}
					>
						Add User +
					</button>
				</div>

				<div className="userAdmin--container">
					<table {...getTableProps()} className="userAdmin--table">
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
							{allRowsEmpty ? (
								<>
									<tr>
										<td
											colSpan={columns.length}
											style={{ textAlign: "center" }}
										>
											No data available.
										</td>
									</tr>
									{[...Array(8)].map((_, index) => (
										<tr key={index}>
											<td colSpan={columns.length}>&nbsp;</td>
										</tr>
									))}
								</>
							) : (
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
							)}
						</tbody>
					</table>
				</div>
			</div>
			<UAPopup
				open={openPopup}
				onClose={() => setOpenPopup(false)}
				user={selectedUser}
			/>
		</>
	);
}

export default UserAdminPage;

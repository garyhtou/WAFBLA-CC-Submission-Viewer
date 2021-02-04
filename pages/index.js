import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Card, Collapse, Divider } from "@geist-ui/react";

export default function Home() {
	const [data, setData] = useState([]);
	const challenges = [
		"Challenge #1",
		"Challenge #2",
		"Challenge #3",
		"Challenge #4",
		"Challenge #5",
	];

	function csvJSON(csv) {
		// https://stackoverflow.com/questions/27979002/convert-csv-data-into-json-format-using-javascript
		var lines = csv.split("\n");

		var result = [];

		// NOTE: If your columns contain commas in their values, you'll need
		// to deal with those before doing the next step
		// (you might convert them to &&& or something, then covert them back later)
		// jsfiddle showing the issue https://jsfiddle.net/
		var headers = lines[0].split(",");

		for (var i = 1; i < lines.length; i++) {
			var obj = {};
			var currentline = lines[i].split(",");

			for (var j = 0; j < headers.length; j++) {
				obj[headers[j]] = currentline[j];
			}

			result.push(obj);
		}

		console.log(result);

		// return result; //JavaScript object
		return JSON.parse(JSON.stringify(result)); //JSON
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>WA FBLA Connections Challange Submission Viewer</title>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					WA FBLA <span>Connections Challange</span> Submission Viewer!
				</h1>

				<form className={styles.form}>
					<p className={styles.description}>
						Get started by pasting the CSV from the submissions:
					</p>
					<textarea
						id="data"
						placeholder="CSV here!"
						onChange={(event) => setData(csvJSON(event.target.value))}
						className={styles.textarea}
						rows={5}
					></textarea>
				</form>

				<div className="submissions-container">
					{data.map((row) => (
						<Card key={row["Entry Id"]} style={{ margin: "1em 0" }}>
							<Card.Content
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<h3>
									{row["Name"]} {row["Last"]}
								</h3>
								<p style={{ flexGrow: "1", textAlign: "right", margin: "0" }}>
									<strong>Entry Id:</strong> #{row["Entry Id"]}
								</p>
							</Card.Content>
							<Divider y={0} />
							<Card.Content>
								<div style={{ marginBottom: "2em" }}>
									<p>
										<strong>Grade: </strong>
										{row["Grade"]}
									</p>
									<p>
										<strong>Email: </strong>
										{row["Email"]}
									</p>
									<p>
										<strong>Chapter: </strong>
										{row["Chapter"]}
									</p>
									<p>
										<strong>Region: </strong>
										{row["Select Your Region"]}
									</p>
									<p>
										<strong>
											Have you submitted challenges for a previous month?:{" "}
										</strong>
										{row["Have you submitted challenges for a previous month?"]}
									</p>
								</div>
								<Collapse.Group>
									{challenges.map((name) => (
										<>
											<Collapse
												title={<h5>{name}</h5>}
												style={{ maxWidth: "100%", maxHeight: "80%vh" }}
											>
												{row[name] && row[name] !== "" ? (
													<img src={row[name]} />
												) : (
													<p>No Image...</p>
												)}
											</Collapse>
										</>
									))}
								</Collapse.Group>
							</Card.Content>
						</Card>
					))}
				</div>
			</main>

			<footer className={styles.footer}>
				<span>Developed by</span>
				<a href="https://garytou.com" target="_blank" rel="noopener noreferrer">
					Gary Tou
				</a>
				<span style={{ margin: "0 0.5em" }}>|</span>
				<a
					href="https://github.com/garyhtou/wafbla-cc-submission-viewer"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
			</footer>
		</div>
	);
}

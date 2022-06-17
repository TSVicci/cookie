export default function UserList({ formDatas }) {
	return (
		<div>
			{formDatas.map((formData) => (
				<div className="card" key={formData.phonenumber}>
					<p className="card-name">{formData.name}</p>
					<p>{formData.email}</p>
					<p>{formData.phonenumber}</p>
				</div>
			))}
		</div>
	);
}

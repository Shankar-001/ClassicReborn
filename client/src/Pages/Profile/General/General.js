import moment from "moment"
import { useSelector } from "react-redux"


function General() {
  const {user} = useSelector(state => state.users)
  return (
    <div className="flex flex-col w-1/4">
        <span className=" text-stone-600 text-xl flex justify-between">
            Name: <span className="text-xl">{user.name}</span>
        </span>
        <span className="text-stone-600 text-xl flex justify-between">
            Email: <span className="text-xl">{user.email}</span>
        </span>
        <span className="text-stone-600 text-xl flex justify-between">
            Created At :{' '}
            <span className="text-xl">
                {moment(user.createdAt).format('DD-MM-YYYY hh:mm A')}
            </span>
        </span>
    </div>
  )
}
export default General
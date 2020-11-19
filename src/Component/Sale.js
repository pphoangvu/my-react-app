import React from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';

class Sale extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sale: {},loading: true};

        this.itemTotal = this.itemTotal.bind(this);
    }
    
    componentDidMount() {
        fetch(`https://nameless-dawn-40104.herokuapp.com/api/sales/${this.props.id}`)
        .then((response) => {
            return response.json();})
        .then((myJson) => {
            if (myJson._id) {
                this.props.viewedSale(myJson._id);
            }
            this.setState({
                sale: myJson,
                loading: false
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({loading: true});

            fetch(`https://nameless-dawn-40104.herokuapp.com/api/sales/${this.props.id}`)
            .then((response) => {
                return response.json(); })
            .then((myJson) => {
                if (myJson._id) {
                    this.props.viewedSale(myJson._id);
                }
                this.setState({
                    sale: myJson,
                    loading: false
                });
            });
        }
    }

    itemTotal(itemTot) {
        let total = 0;
        for (let i = 0; i < itemTot.length; i++) {
            total += itemTot[i].price * itemTot[i].quantity;
        }
        return total;
    }
    
    render() {
        if (this.state.loading) {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        } else {
            if (this.state.sale._id) {
                return (
                    <div>
                        <h1>Sale: {this.state.sale._id}</h1>
                        <h2>Customer</h2>
                        <ListGroup>
                            <ListGroupItem><strong>email:</strong> {this.state.sale.customer.email}</ListGroupItem>
                            <ListGroupItem><strong>age:</strong> {this.state.sale.customer.age}</ListGroupItem>
                            <ListGroupItem><strong>satisfaction:</strong> {this.state.sale.customer.satisfaction} / 5</ListGroupItem>
                        </ListGroup>
                        <h2> Items: ${this.itemTotal(this.state.sale.items).toFixed(2)}</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sale.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>);
            } else {
                return <div><h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>
            }
        }
    }
}


export default Sale;


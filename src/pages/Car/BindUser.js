import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Card, Col, Divider, Dropdown, Form, Icon, Input, Menu, message, Row } from 'antd';

import BizConst from '@/common/BizConst';
import AddBizForm from '@/common/AddBizForm';
import EditBizForm from '@/common/EditBizForm';
import { TableListBase } from '@/common/TableLists';
import { deleteConfirm } from '@/utils/BizUtil';
import { addForm, editForm } from './BindUserForms';

import styles from './BindUser.less';

// 页面常量
const FormItem = Form.Item;

// 底层组件
@connect(({ car, loading }) => ({
  pageBindUser: car.pageBindUser,
  bindUser: car.bindUser,
  loading: loading.models.car,
}))
@Form.create()
class BindUser extends PureComponent {
  state = {
    addVisible: false,
    editVisible: false,
    editWidth: 660,
    pageQuery: {},
    queryPage: 0,
  };

  columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'areaId',
      dataIndex: 'areaId',
    },
    {
      title: 'utype',
      dataIndex: 'utype',
    },
    {
      title: 'uname',
      dataIndex: 'uname',
    },
    {
      title: 'tel',
      dataIndex: 'tel',
    },
    {
      title: 'insTime',
      dataIndex: 'insTime',
    },
    {
      title: <FormattedMessage id="form.action" defaultMessage="No translate" />,
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleEditVisible(true, record.id)}>
            <FormattedMessage id="form.edit" defaultMessage="No translate" />
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              deleteConfirm('相关人员', record.id, this.handleDelete);
            }}
          >
            <FormattedMessage id="form.delete" defaultMessage="No translate" />
          </a>
          <Divider type="vertical" />
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => this.moreBtnExc(key)}>
                <Menu.Item key="more">更多操作</Menu.Item>
              </Menu>
            }
          >
            <a>
              <FormattedMessage id="form.more" defaultMessage="No translate" /> <Icon type="down" />
            </a>
          </Dropdown>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.dispatchPageList(0, {});
  }

  handleAddVisible = flag => {
    this.setState({
      addVisible: !!flag,
    });
  };

  handleAdd = fields => {
    console.log(fields);
    const formParam = { ...fields };
    //
    const { dispatch } = this.props;
    dispatch({
      type: 'car/reqCommon',
      service: 'addBindUser',
      payload: formParam,
      callback: () => {
        this.dispatchPageList(0, {});
        message.success('添加成功');
      },
    });
    this.handleAddVisible();
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'car/reqCommon',
      service: 'delBindUser',
      payload: { id },
      callback: () => {
        this.dispatchPageList();
        message.success('删除成功');
      },
    });
  };

  handleEditVisible = (flag, id) => {
    if (flag) {
      const { dispatch } = this.props;
      dispatch({
        type: 'car/reqCommon',
        service: 'getBindUser',
        payload: { id },
      });
    }
    this.setState({
      editVisible: !!flag,
    });
  };

  handleEdit = fields => {
    const formParam = { ...fields };
    //
    const { dispatch } = this.props;
    dispatch({
      type: 'car/reqCommon',
      service: 'editBindUser',
      payload: formParam,
      callback: () => {
        this.dispatchPageList();
        message.success('修改成功');
      },
    });
    this.handleEditVisible();
  };

  handleQueryVisible = () => {};

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.dispatchPageList(0, { id: fieldsValue.id });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.dispatchPageList(0, {});
  };

  handlePageChange = pagination => {
    this.dispatchPageList(pagination.current - 1);
  };

  moreBtnExc = key => {
    console.log(key);
  };

  dispatchPageList(page, queryParam) {
    const { dispatch } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { query: pageQuery, page: queryPage, size: BizConst.pageSize };
    dispatch({
      type: 'car/reqCommon',
      service: 'pageBindUser',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={14} sm={24}>
            <FormItem label="id">
              {getFieldDecorator('id')(
                <Input placeholder={formatMessage({ id: 'form.weight.placeholder' })} />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={14}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="form.search" defaultMessage="No translate" />
              </Button>
              <Button style={{ margin: '0 8px' }} onClick={this.handleFormReset}>
                <FormattedMessage id="form.reset" defaultMessage="No translate" />
              </Button>
              <Button icon="search" onClick={() => this.handleQueryVisible(true)}>
                高级查询
              </Button>
            </span>
          </Col>
          <Col md={4} sm={4} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => this.handleAddVisible(true)}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { addVisible, editVisible, editWidth } = this.state;
    const { pageBindUser, bindUser, loading } = this.props;

    const propsTableList = {
      ...pageBindUser,
      loading,
      columns: this.columns,
    };

    const addMethods = {
      handleAdd: this.handleAdd,
      handleAddVisible: this.handleAddVisible,
      bizForm: addForm,
    };

    const editMethods = {
      handleEdit: this.handleEdit,
      handleEditVisible: this.handleEditVisible,
      bizForm: editForm,
    };

    return (
      <div className={styles.testCss}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <TableListBase {...propsTableList} onChange={this.handlePageChange} />
          </div>
        </Card>
        <AddBizForm {...addMethods} addVisible={addVisible} />
        <EditBizForm
          {...editMethods}
          editVisible={editVisible}
          editWidth={editWidth}
          loading={loading}
          formValue={bindUser}
        />
      </div>
    );
  }
}

export default BindUser;

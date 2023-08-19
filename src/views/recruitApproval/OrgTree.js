import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

const OrgTree = () => {
  const members=useSelector(state=>state.customization.members)
  const splicemembers=members.splice(0,8)
  return(
    <>
    {splicemembers.map(data=>(
      <Tree
      lineWidth={'2px'}
      lineColor={'green'}
      lineBorderRadius={'10px'}
      key={data._id}
      label={<StyledNode>{data.name}</StyledNode>}
    >
      <TreeNode label={<StyledNode>Child 1</StyledNode>}>
        <TreeNode label={<StyledNode>Grand Child</StyledNode>} />
      </TreeNode>
      <TreeNode label={<StyledNode>Child 2</StyledNode>}>
        <TreeNode label={<StyledNode>Grand Child</StyledNode>}>
          <TreeNode label={<StyledNode>Great Grand Child 1</StyledNode>} />
          <TreeNode label={<StyledNode>Great Grand Child 2</StyledNode>} />
        </TreeNode>
      </TreeNode>
      <TreeNode label={<StyledNode>Child 3</StyledNode>}>
        <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
        <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
      </TreeNode>
    </Tree>
    ))}
  </>
  )
}


export default OrgTree